export class ErrorHandler {
    static handleError(err, req, res, next) {
        if (err.body instanceof SyntaxError && err.status === 400) {
            res.status(400).json({ message: "Invalid JSON format" });
            return;
        }
        ;
        next(err);
    }
}
//# sourceMappingURL=errorHandler.js.map