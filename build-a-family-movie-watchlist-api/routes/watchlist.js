import express from "express";
import {
    getWatchlist,
    addMovie,
    updateMovie,
    deleteMovie
} from "../utils/db.js";

import { authorizeModification } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const userWatchlist = getWatchlist(userId);

    if (userWatchlist === null) {
        return res.status(404).json({
            error: `${req.params.userId} record doesn't exist in database!`
        });
    }

    return res.status(200).json(userWatchlist);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const result = addMovie(userId, req.body);

    if (result === null) {
        return res.status(404).json({
            error: "null response! didn't add movie!"
        });
    }

    return res.status(201).json(result);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const result = updateMovie(userId, movieId, req.body);

    if (result === null) {
        return res.status(404).json({
            error: "null response! didn't update movie!"
        });
    }

    return res.status(200).json(result);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const deleted = deleteMovie(userId, movieId);

    if (!deleted) {
        return res.status(404).json({
            error: "unable to delete movie!"
        });
    }

    return res.status(200).json({
        message: "successfully deleted"
    });
});

export default router;