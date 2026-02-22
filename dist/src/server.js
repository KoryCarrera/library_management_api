//import express
import app from "./app.js";
import { prisma } from "./config/prisma.js";
//We capture the port from the environment variables or define 8080 as the default
const PORT = process.env.PORT ?? 8080;
try {
    await prisma.$connect();
    app.listen(PORT, () => {
        console.log(`listen in the port http://localhost:${PORT}`);
    });
}
catch (err) {
    console.error(err);
    process.exit(1);
}
//# sourceMappingURL=server.js.map