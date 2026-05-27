import { getTranslations } from "next-intl/server";
import { SkewUnderline } from "@/components/skew-underline";
import { SettingsAppearance } from "@/components/account/settings-appearance";
import { SettingsNotifications } from "@/components/account/settings-notifications";
import { SettingsAccount } from "@/components/account/settings-account";
import { SettingsDangerZone } from "@/components/account/settings-danger-zone";

export default async function SettingsPage() {
  const t = await getTranslations("account.settings");

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h1 className="font-display text-[28px] font-black leading-tight tracking-tight text-[#0D1801] dark:text-white sm:text-[32px]">
          <SkewUnderline color="#BFFF00" height="40%">
            {t("title")}
          </SkewUnderline>
        </h1>
      </div>

      <SettingsAppearance />
      <SettingsNotifications />
      <SettingsAccount />
      <SettingsDangerZone />
    </div>
  );
}
