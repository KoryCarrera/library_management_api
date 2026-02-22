import jwt from "jsonwebtoken";

export class AuthMiddle {

    static verifyToken(req: any, res: any, next: any) {
        
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const authHeader = req.headers.authorization;

        const token = authHeader.split(/\s+/)[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? "super_secret_and_long_key");

            if (!decoded) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = decoded;

            next();

        } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}