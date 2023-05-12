import { AnswerType, FileType } from "./../../types/files.type";
import {
  customMessage,
  emptyFile,
  failedDownloadFile,
  failedReadFile,
  failedUploadFile,
  notFound,
} from "./server.local";
import config from "../../config/config";
import { initializeApp, cert } from "firebase-admin/app";
import { Storage, File, GetSignedUrlConfig } from "@google-cloud/storage";
import glob from "glob";
import { readdir } from "fs/promises";
import Path from "path";
import { IQuestion } from "../../models/questions.model";

initializeApp({
  credential: cert(config.googleCreds),
  storageBucket: "quizapp-ecf8a.appspot.com",
});

const getFiles = async (source: string) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
export var getAllDirectories = function (
  src: string,
  callback: {
    (err: any, res: any): void;
    (err: Error | null, matches: string[]): void;
  }
) {
  glob(src + "/**/*", callback);
};

export async function uploadMultiFilesToCloud(
  distPath: string,
  srcPath: string,
  locale: string
) {
  try {
    const bucketName = "quizapp-ecf8a.appspot.com";
    const storage = new Storage();
    let fileNames: Array<{}> = [];
    const bucket = storage.bucket(bucketName);
    const breakpoint: RegExp = /(\\)|(\\)+(\\)|(\/)/g;
    getAllDirectories(srcPath, async function (err: any, res: Array<any>) {
      if (err) {
        console.log("Error", err);
      } else {
        for await (const localePath of res) {
          let uploadPath = `${distPath}${
            localePath.split(srcPath)[1]
          }`.substring(0, localePath.lastIndexOf("/"));
          if (localePath.includes(".")) {
            let d = await bucket
              .upload(localePath, {
                destination: uploadPath,
                predefinedAcl: "publicRead",
              })
              .catch(async (err) => {
                console.error(err);
                sleep(100);

                d = await bucket.upload(localePath, {
                  destination: uploadPath,
                  predefinedAcl: "publicRead",
                });
              });
            if (d) console.log("file", d[0].name);
          }
          sleep(100);
        }
      }
    });
    return fileNames;
  } catch (error) {
    let e = Error(failedUploadFile(locale));
    throw e;
  }
}

export async function getFolderContent(locale: string, destFileName?: string) {
  if (!destFileName) throw Error(emptyFile(locale));
  const options = {
    destination: destFileName,
  };
  const storage = new Storage();
  const bucketName = "quizapp-ecf8a.appspot.com";
  // Downloads the file
  // console.log(
  //   `gs://${bucketName}/${destFileName} downloaded to ${destFileName}.`
  // );
  try {
    const bucket = storage.bucket(bucketName);

    let CONFIG: GetSignedUrlConfig = {
      action: "read",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };
    let fileNames: Array<AnswerType> = [];

    const files = await bucket.getFiles({
      prefix: `${destFileName}/`,
      includeTrailingDelimiter: false,
      delimiter: "/",
    });
    // console.log("files", files);

    for await (var file of files[0]) {
      let name = file["name"];
      file.exists();
      file.getSignedUrl(CONFIG, function (err, url) {
        if (!err && name.split(`${destFileName}/`)[1].length > 0) {
          let o: AnswerType = {
            url: url,
            name: name.split(`${destFileName}/`)[1],
            isAnswer: name.toLocaleLowerCase().includes("answer") ?? false,
          };
          // console.log(value);
          fileNames.push(o);
        }
      });
      await sleep(20);
    }

    // await sleep(100);
    // console.log("files", fileNames);

    return fileNames;
  } catch (error) {
    throw error;
  }
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
