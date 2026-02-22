export class ErrorHandler {

    static handleError(err: any, req: any, res: any, next: any) {

        if (err instanceof SyntaxError && err.status === 400) {
            res.status(400).json({ message: "Invalid JSON format" })

            return;
        };

        next(err);
    }
}
