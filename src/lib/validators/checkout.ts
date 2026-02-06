export type CheckoutData = {
    name: string;
    address: string;
    phone: string;
    email: string;
};

export function validateCheckout(data: CheckoutData) {
    const errors: Partial<Record<keyof CheckoutData, string>> = {};

    if (!data.name.trim()) {
        errors.name = "Name is required";
    }

    if (!data.address.trim()) {
        errors.address = "Address is required";
    }

    if (!data.phone.trim()) {
        errors.phone = "Phone is required";
    } else if (!/^\d+$/.test(data.phone)) {
        errors.phone = "Phone must be numeric";
    } else if (data.phone.length < 5) {
        errors.phone = "Phone must be at least 5 digits";
    }


    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
        errors.email = "Email is invalid";
    }

    return errors;
}
