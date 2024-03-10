/**
 * @swagger
 * paths:
 *   /:
 *     get:
 *       summary: Get home page information
 *       tags:
 *         - Home
 *       responses:
 *         200:
 *           description: Successfully retrieved home page information.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Here is the home for testing purpose"
 *                 success: true
 *         500:
 *           description: Internal server error in getting home page.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in getting home page"
 *                 error: "Error message details"
 */

// To check my server is working or not
module.exports.home = async (req,res)=>{
    try {
        return res.status(200).json({
            message: "here is the home for testing purpose",
            success: true,

        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting home page",
            error: error.message
        })
    }
}