import { getAllChats } from '../../routes/historyController';
import { withLogger } from '../../middleware/logger';

/**
 * @openapi
 * /api/history:
 *   get:
 *     description: Retrieve all chat sessions from PostgreSQL
 *     responses:
 *       200:
 *         description: A list of chat sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   accumulated_score:
 *                     type: number
 */
export default withLogger(getAllChats);
