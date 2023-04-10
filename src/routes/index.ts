import { Router } from "express";
import * as archiveController from "../controllers/archive.controller";
import * as authController from "../controllers/auth.controller";
import * as quizController from "../controllers/quiz.controller";
import * as resultsController from "../controllers/result.controller";

const routes = Router();

routes.get("/getFolderContent", archiveController.getFolderContenHandler);
routes.post(
  "/createAllQuestionHandler",
  quizController.createAllQuestionHandler
);

routes.get("/uploadFolder", archiveController.uploadFolderToCloudHandler);
routes.post("/register", authController.userRegisterInfoHandler);
routes.post("/authenticate", authController.logInHandler);
routes.post("/getLevelQuestions", quizController.getLevelQuestionsHandler);
routes.get("/getUser", authController.getUserHandler);
routes.get("/getUserQuizResults", resultsController.getAllQuizResultsHandler);
routes.get("/getQuizResult", resultsController.getQuizResultHandler);
routes.post("/addQuizResult", resultsController.createQuizResultHandler);

export default routes;
