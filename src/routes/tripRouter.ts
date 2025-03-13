import { Router } from "express";
import { createTrip, deleteTrip, getAllTrips, getTrip, updateTrip } from "../controllers/tripController";

const tripRouter = Router()

tripRouter.get("/", getAllTrips)
tripRouter.get("/:id", getTrip)
tripRouter.post("/", createTrip)
tripRouter.patch("/:id", updateTrip)
tripRouter.delete("/:id", deleteTrip)

export default tripRouter