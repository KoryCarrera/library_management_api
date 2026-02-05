import { z } from "zod";

export class UserValidations {

    private static userSchema= z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
        lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
        email: z.string().email("Formato de email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        rolId: z.union([z.literal(1), z.literal(2)], {
            errorMap: () => ({ message: "El rol debe ser 1 o 2" })
        }),
        sectionId: z.number().int().positive("Debe seleccionar una sección valida"),
        state: z.enum(["ACTIVE", "DISABLE"]).default("ACTIVE"),
        salary: z.coerce.number().int().min(0).default(0)
    });

    private static loginUserSchema = z.object({
        email: z.string().email("Formato de email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
    })

    static validateUser(data: unknown) {
        return this.userSchema.safeParse(data);
    }

    static validateDataLogin(data: unknown) {
        return this.loginUserSchema.safeParse(data)
    }
}

export type RegisterUserInput = z.infer<typeof UserValidations["userSchema"]>;
export type LoginUserInput = z.infer<typeof UserValidations["loginUserSchema"]>