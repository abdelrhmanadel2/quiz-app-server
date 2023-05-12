import { Router } from "express";
import * as archiveController from "../controllers/archive.controller";
import * as authController from "../controllers/auth.controller";
import * as quizController from "../controllers/quiz.controller";
import * as resultsController from "../controllers/result.controller";

const routes = Router();

routes.get("/getFolderContent", archiveController.getFolderContenHandler);
routes.get("/setQuestionsUrls", quizController.setQuestionsUrlHandler);
    routes.post(
  "/createAllQuestionHandler",
  quizController.createAllQuestionHandler
);

routes.get("/uploadFolder", archiveController.uploadFolderToCloudHandler);
routes.post("/register", authController.userRegisterInfoHandler);
routes.post("/authenticate", authController.logInHandler);
routes.post("/addKid", authController.parentAddKidHandler);
routes.get("/getKid", authController.getKidHandler);
routes.get("/getUser", authController.getUserHandler);
routes.get("/getKidsList", authController.getParentKidsHandler);
routes.get("/deleteUser", authController.deleteParentKidsHandler);

routes.post("/getLevelQuestions", quizController.getLevelQuestionsHandler);
routes.get("/getUserQuizResults", resultsController.getAllQuizResultsHandler);
routes.get("/getQuizResult", resultsController.getQuizResultHandler);
routes.post("/addQuizResult", resultsController.createQuizResultHandler);
routes.post("/addCurrentQuiz", quizController.addCurrentQuizHandler);
routes.get("/getCurrentQuiz", quizController.getCurrentQuizHandler);
routes.get("/getAllUsers", authController.getAllUsersHandler );
routes.get("/deleteCurrentQuiz", quizController.deleteCurrentQuizHandler);
export default routes;
