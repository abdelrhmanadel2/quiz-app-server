// general mesages
export const successStatus = (locale: string) =>
  locale == "ar" ? "نجحت العملية" : "Success";
export const addSuccess = (locale: string, name: string[]) =>
  locale == "ar"
    ? `تم اضافه ${name[0]} بنجاح`
    : `${name[1]} Created Successfully`;
export const updateSuccess = (locale: string, name: string[]) =>
  locale == "ar"
    ? `تم تعديل ${name[0]} بنجاح`
    : `${name[1]} Updated Successfully`;
export const updateFaild = (locale: string, name: string[]) =>
  locale == "ar" ? `فشل تعديل ${name[0]} !` : `${name[1]} Update Failed !`;
export const documentAltered = (locale: string, name: string[]) =>
  locale == "ar"
    ? `يوجد نسخه احدث من البيانات يرجي تحديث الصفحه وأعاده المحاوله.`
    : `${name[1]} Document Alterd Please Refresh And Try Agian.`;
export const documentAlreadyAccepted = (locale: string, name: string[]) =>
  locale == "ar"
    ? `يوجد موافقه سابقه علي هذه البيانات  ${name[0]}ولا يمكن تعديلها `
    : `${name[1]} Document has been approved and can't be alterd agian.`;

export const failedStatus = (locale: string) =>
  locale == "ar" ? "فشلت العملية" : "Failed";
export const dublication = (locale: string, name: string) =>
  locale == "ar"
    ? `لا يمكن تسجيل بيانات ${name}  بسبب التكرار `
    : `Unable to Save ${name} Data Duo Dublication`;
export const notFound = (locale: string, name: any) =>
  locale == "ar"
    ? `لا يمكن ايجاد بيانات(${name})`
    : `Data for (${name}) cant be found`;

export const allAddedButSome = (locale: string, errorArray: string[]) =>
  locale == "ar"
    ? errorArray.join(" , ") + " تم اضافه كل المدخلات عدي"
    : "All Items inserted Successfully Except " + errorArray.join(" , ");
export const customMessage = (locale: string, message: string[]) =>
  locale == "ar" ? message[0] : message[1];

// files messages
export const failedReadFile = (locale: string) =>
  locale == "ar" ? "ملف ذو تنسيق خاطئ" : "File isn't CSV";

export const emptyFile = (locale: string) =>
  locale == "ar" ? "ملف فارغ" : "File is empty";

export const failedUploadFile = (locale: string) =>
  locale == "ar" ? "ملف ذو تنسيق خاطئ" : "File isn't in proper formate";
export const failedDownloadFile = (locale: string) =>
  locale == "ar" ? "لا يوجد ملف للتحميل" : "No file to download";
