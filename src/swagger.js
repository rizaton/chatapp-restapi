import swaggerJSDoc from "swagger-jsdoc";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User endpoints.
 */

/**
 * @swagger
 * tags:
 *   name: ChatRooms
 *   description: ChatRoom endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message endpoints
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification endpoints
 */

/**
 * @swagger
 * tags:
 *   name: CallLogs
 *   description: CallLog endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Unique username of the user
 *         name:
 *           type: string
 *           description: Display name of the user
 *         email:
 *           type: string
 *           description: Unique email of the user
 *         password:
 *           type: string
 *           description: Hashed password of the user
 *         avatar_url:
 *           type: string
 *           description: Profile picture URL of the user
 *         status:
 *           type: string
 *           enum: ["online", "offline"]
 *           description: User's current status
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation
 *       example:
 *         username: johndoe
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: hashedpassword123
 *         avatar_url: "https://example.com/avatar.jpg"
 *         status: online
 *         created_at: "2024-02-12T12:34:56Z"
 *     ChatRoom:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Chat room name
 *         isGroup:
 *           type: boolean
 *           description: Whether the chat room is a group chat
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: ObjectId
 *                 description: User ID
 *               role:
 *                 type: string
 *                 enum: ["admin", "member"]
 *                 description: User role in the chat
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of chat room creation
 *       example:
 *         name: "Developers Chat"
 *         isGroup: true
 *         members:
 *           - userId: "60f7e2c6a7c2e63f3c2b9b57"
 *             role: admin
 *           - userId: "60f7e2c6a7c2e63f3c2b9b58"
 *             role: member
 *         createdAt: "2024-02-12T12:34:56Z"
 *     Message:
 *       type: object
 *       required:
 *         - sender
 *         - chatRoom
 *         - content
 *       properties:
 *         sender:
 *           type: string
 *           format: ObjectId
 *           description: Sender of the message
 *         chatRoom:
 *           type: string
 *           format: ObjectId
 *           description: Chat room ID
 *         content:
 *           type: string
 *           description: Message content
 *         messageType:
 *           type: string
 *           enum: ["text", "image", "video", "file"]
 *           description: Type of message
 *         status:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 format: ObjectId
 *                 description: User who received the message
 *               state:
 *                 type: string
 *                 enum: ["sent", "delivered", "read"]
 *                 description: Message status
 *         log:
 *           type: object
 *           properties:
 *             edited:
 *               type: boolean
 *               description: If the message was edited
 *             editedAt:
 *               type: string
 *               format: date-time
 *               description: Timestamp of last edit
 *             deleted:
 *               type: boolean
 *               description: If the message was deleted
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of message creation
 *       example:
 *         sender: "60f7e2c6a7c2e63f3c2b9b57"
 *         chatRoom: "60f7e2c6a7c2e63f3c2b9b58"
 *         content: "Hello, world!"
 *         messageType: text
 *         status:
 *           - user: "60f7e2c6a7c2e63f3c2b9b59"
 *             state: delivered
 *         log:
 *           edited: false
 *           editedAt: null
 *           deleted: false
 *         createdAt: "2024-02-12T12:34:56Z"
 *     CallLog:
 *       type: object
 *       required:
 *         - caller
 *         - receiver
 *         - type
 *       properties:
 *         caller:
 *           type: string
 *           format: ObjectId
 *           description: Caller user ID
 *         receiver:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: ObjectId
 *                 description: Receiver user ID
 *         type:
 *           type: string
 *           enum: ["voice", "video"]
 *           description: Call type
 *         status:
 *           type: string
 *           enum: ["ended", "ongoing", "calling"]
 *           description: Call status
 *         startedAt:
 *           type: string
 *           format: date-time
 *           description: Call start time
 *         duration:
 *           type: number
 *           description: Duration of the call in seconds
 *         endedAt:
 *           type: string
 *           format: date-time
 *           description: Call end time
 *       example:
 *         caller: "60f7e2c6a7c2e63f3c2b9b57"
 *         receiver:
 *           - userId: "60f7e2c6a7c2e63f3c2b9b58"
 *         type: voice
 *         status: ended
 *         startedAt: "2024-02-12T12:30:00Z"
 *         duration: 300
 *         endedAt: "2024-02-12T12:35:00Z"
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *         - type
 *       properties:
 *         user:
 *           type: string
 *           format: ObjectId
 *           description: User who receives the notification
 *         type:
 *           type: string
 *           enum: ["message", "call", "mention"]
 *           description: Type of notification
 *         content:
 *           type: string
 *           description: Notification content
 *         isRead:
 *           type: boolean
 *           description: Read status of the notification
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of notification creation
 *       example:
 *         user: "60f7e2c6a7c2e63f3c2b9b57"
 *         type: message
 *         content: "You have a new message"
 *         isRead: false
 *         createdAt: "2024-02-12T12:34:56Z"
 */

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chatapp API",
      version: "1.0.0",
      description: "Chatapp API description",
    },
  },
  apis: [
    "./src/routes/*.js",
    "./src/routes/*.ts",
    "./src/swagger.js",
    "./src/swagger.ts",
  ],
});

export default swaggerSpec;
