import express from "express";
import Result from "../models/result.js";

const router = express.Router();

// Route for Save a new Result
router.post("/post", async (request, response) => {
    try {
      if (
        !request.body.email ||
        !request.body.accuracy ||
        !request.body.cpm ||
        !request.body.wpm
      ) {
        return response
          .status(400)
          .send({
            message: "Send all required fields: email, accuracy, cpm, wpm",
          });
      }
      const newResult = {
        email: request.body.email,
        accuracy: request.body.accuracy,
        cpm: request.body.cpm,
        wpm: request.body.wpm,
      };
  
      const result = await Result.create(newResult);
   
      return response.status(201).send(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.get("/get", async(request, response) => {
     try {
      const result = await Result.find({});

      return response.status(200).json({
        data: result,
      });
     } catch (error) {
       console.log(error.message);
       response.status(500).send({message: error.message})
     }
  })

  export default router;