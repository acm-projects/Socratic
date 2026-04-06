import { getChatMessages } from '../../../routes/historyController';
import { withLogger } from '../../../middleware/logger';

/**
 * @openapi
 * /api/history/{chatId}:
 *   get:
 *     description: Retrieve all messages for a specific chat ID
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat session
 *     responses:
 *       200:
 *         description: A list of messages.
 */
export default withLogger(getChatMessages);
