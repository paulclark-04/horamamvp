"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function toOptionalString(value: FormDataEntryValue | null) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
}

export async function updateLeadStatus(formData: FormData) {
    await requireAdmin();

    const leadId = toOptionalString(formData.get("id"));
    const statut = toOptionalString(formData.get("statut"));

    if (!leadId || !statut) {
        redirect("/admin/qualification-leads");
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("leads_contacts")
        .update({ statut })
        .eq("id", leadId)
        .eq("type", "lead");

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/qualification-leads");
    revalidatePath(`/admin/qualification-leads/${leadId}`);
    redirect(`/admin/qualification-leads/${leadId}`);
}

