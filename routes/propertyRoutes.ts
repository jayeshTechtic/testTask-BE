import { Request, Response, Router } from "express";
import Property from "../Models/Property";

const router = Router();

// Get all properties with pagination and filtering
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      searchQuery,
      room,
      propertyType,
      page = "1",
      limit = "10",
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid page number",
      });
    }

    if (isNaN(pageSize) || pageSize < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid limit",
      });
    }

    const query: any = {};

    if (searchQuery) {
      query.$or = [
        { title: new RegExp(searchQuery as string, "i") },
        { description: new RegExp(searchQuery as string, "i") },
      ];
    }

    if (room) {
      query.rooms = parseInt(room as string, 10);
    }

    if (propertyType) {
      query.type = propertyType as string;
    }

    const skip = (pageNumber - 1) * pageSize;

    const [properties, total] = await Promise.all([
      Property.find(query).skip(skip).limit(pageSize),
      Property.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: properties,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

export default router;
