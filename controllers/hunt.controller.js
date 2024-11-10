import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HuntModel } from "../models/hunt.models.js";

const yourHunts = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(400, "User ID is missing from the request");
        }

        console.log("Fetching hunts for user ID:", userId);  
        const hunts = await HuntModel.find({
            $or: [{ createdBy: userId }, { "participants.user": userId }]
        })
        .populate("participants.user", "name email")
        .populate("createdBy", "name email");       
        if (!hunts || hunts.length === 0) {
            throw new ApiError(404, "No hunts found for this user");
        }
        res.status(200).json(new ApiResponse(200, hunts, "Fetched user's hunts successfully"));
    } catch (error) {
        console.error("Error fetching user's hunts:", error);  
        throw new ApiError(500, error.message || "Failed to fetch user's hunts");
    }
});

export { yourHunts };
