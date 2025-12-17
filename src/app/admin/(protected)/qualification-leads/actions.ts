"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function updateLeadStatus(
  leadId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify admin access
    await requireAdmin();

    if (!leadId || !newStatus) {
      return { success: false, error: "Données manquantes" };
    }

    const validStatuses = ["new", "contacted", "qualified", "lost"];
    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: "Statut invalide" };
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("leads_contacts")
      .update({ statut: newStatus })
      .eq("id", leadId)
      .eq("type", "lead");

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Erreur lors de la mise à jour" };
    }

    // Revalidate the pages to show updated data
    revalidatePath("/admin/qualification-leads");
    revalidatePath(`/admin/qualification-leads/${leadId}`);
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Update lead status error:", error);
    return { success: false, error: "Erreur serveur" };
  }
}
