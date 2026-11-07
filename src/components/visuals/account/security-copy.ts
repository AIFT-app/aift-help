// Strings for the Security tab and the second sign-in step (two-factor-authentication),
// read from aift-web messages (origin/staging @ 08fb7e34, 2026-11-06). Dates, counts
// and passkey names are the fixture: the names are what Supabase Auth stores for
// those password managers.
export const RECOVERY_CODES = ["xbcehaw6mp", "j7yaxa7dgj", "9efkvem7ya", "hz3ztacv89", "t52s4thzg9", "c7nzquq2cf", "43qcvk3fzp", "qgrhm3bgbr", "zuwbyegnxq", "dskhuapbcn"] as const

export const securityCopy = {
  "en": {
    "tabs": [
      "Profile",
      "Security",
      "Language",
      "Notifications"
    ],
    "twoFactor": {
      "section_heading": "Two-factor sign-in",
      "section_description": "After your password we also ask for a 6-digit code from the authenticator app on your phone.",
      "authenticator": "Authenticator app",
      "on": "On",
      "remove": "Remove",
      "codes_label": "Recovery codes",
      "codes_new": "New codes",
      "codes_title": "Save your recovery codes",
      "codes_body": "If you lose your phone, these let you sign in. Each works once. This is the last time you see them.",
      "codes_copy": "Copy",
      "codes_download": "Download (.txt)",
      "codes_saved": "I have saved the codes",
      "codes_done_hint": "Tick that you saved them first.",
      "done": "Done"
    },
    "setUpOn": "Set up 2026-10-14",
    "codesLeft": "9 of 10 unused",
    "passkeys": {
      "section_heading": "Passkeys",
      "section_description": "Sign in with your fingerprint, face or device PIN instead of a password. These never leave your device.",
      "remove": "Remove",
      "add": "Add a passkey"
    },
    "passkeyRows": [
      [
        "iCloud Keychain",
        "Added 2026-10-14 · last used 2026-11-03"
      ],
      [
        "Google Password Manager",
        "Added 2026-10-20 · last used 2026-10-28"
      ]
    ],
    "password": {
      "section_heading": "Password",
      "section_description": "Choose a new password. We'll sign out your other devices as a safety measure.",
      "current_label": "Current password"
    },
    "verify": {
      "heading": "One more step",
      "intro": "Enter the 6-digit code from your authenticator app.",
      "code_label": "Code",
      "submit": "Verify",
      "use_recovery": "No phone with you? Use a recovery code",
      "sign_out": "Sign out"
    },
    "picker": [
      "English",
      "Magyar",
      "Deutsch"
    ]
  },
  "hu": {
    "tabs": [
      "Profil",
      "Biztonság",
      "Nyelv",
      "Értesítések"
    ],
    "twoFactor": {
      "section_heading": "Kétlépcsős azonosítás",
      "section_description": "A jelszó után egy 6 jegyű kódot is kérünk a telefonodon lévő hitelesítő alkalmazásból.",
      "authenticator": "Hitelesítő alkalmazás",
      "on": "Bekapcsolva",
      "remove": "Eltávolítás",
      "codes_label": "Helyreállító kódok",
      "codes_new": "Új kódok",
      "codes_title": "Mentsd el a helyreállító kódjaidat",
      "codes_body": "Ha elveszíted a telefonodat, ezekkel tudsz belépni. Mindegyik egyszer használható. Most látod őket utoljára.",
      "codes_copy": "Másolás",
      "codes_download": "Letöltés (.txt)",
      "codes_saved": "Elmentettem a kódokat",
      "codes_done_hint": "Előbb pipáld ki, hogy elmentetted őket.",
      "done": "Kész"
    },
    "setUpOn": "Beállítva: 2026-10-14",
    "codesLeft": "10-ből 9 felhasználatlan",
    "passkeys": {
      "section_heading": "Passkeyk",
      "section_description": "Belépés jelszó helyett ujjlenyomattal, arccal vagy az eszközöd PIN-kódjával. Ezek nem hagyják el az eszközt.",
      "remove": "Eltávolítás",
      "add": "Passkey hozzáadása"
    },
    "passkeyRows": [
      [
        "iCloud Keychain",
        "Hozzáadva: 2026-10-14 · utoljára használva: 2026-11-03"
      ],
      [
        "Google Password Manager",
        "Hozzáadva: 2026-10-20 · utoljára használva: 2026-10-28"
      ]
    ],
    "password": {
      "section_heading": "Jelszó",
      "section_description": "Válassz új jelszót. Biztonsági okokból kijelentkeztetjük a többi eszközödről.",
      "current_label": "Jelenlegi jelszó"
    },
    "verify": {
      "heading": "Még egy lépés",
      "intro": "Írd be a hitelesítő alkalmazásod 6 jegyű kódját.",
      "code_label": "Kód",
      "submit": "Ellenőrzés",
      "use_recovery": "Nincs nálad a telefonod? Helyreállító kódot használok",
      "sign_out": "Kijelentkezés"
    },
    "picker": [
      "English",
      "Magyar",
      "Deutsch"
    ]
  },
  "de": {
    "tabs": [
      "Profil",
      "Sicherheit",
      "Sprache",
      "Benachrichtigungen"
    ],
    "twoFactor": {
      "section_heading": "Zwei-Faktor-Anmeldung",
      "section_description": "Nach Ihrem Passwort fragen wir zusätzlich einen 6-stelligen Code aus der Authenticator-App auf Ihrem Telefon ab.",
      "authenticator": "Authenticator-App",
      "on": "Aktiv",
      "remove": "Entfernen",
      "codes_label": "Wiederherstellungscodes",
      "codes_new": "Neue Codes",
      "codes_title": "Speichern Sie Ihre Wiederherstellungscodes",
      "codes_body": "Wenn Sie Ihr Telefon verlieren, melden Sie sich damit an. Jeder Code gilt einmal. Sie sehen sie jetzt zum letzten Mal.",
      "codes_copy": "Kopieren",
      "codes_download": "Herunterladen (.txt)",
      "codes_saved": "Ich habe die Codes gespeichert",
      "codes_done_hint": "Bestätigen Sie zuerst, dass Sie sie gespeichert haben.",
      "done": "Fertig"
    },
    "setUpOn": "Eingerichtet am 2026-10-14",
    "codesLeft": "9 von 10 unbenutzt",
    "passkeys": {
      "section_heading": "Passkeys",
      "section_description": "Anmeldung mit Fingerabdruck, Gesicht oder Geräte-PIN statt Passwort. Diese verlassen Ihr Gerät nie.",
      "remove": "Entfernen",
      "add": "Passkey hinzufügen"
    },
    "passkeyRows": [
      [
        "iCloud Keychain",
        "Hinzugefügt am 2026-10-14 · zuletzt verwendet am 2026-11-03"
      ],
      [
        "Google Password Manager",
        "Hinzugefügt am 2026-10-20 · zuletzt verwendet am 2026-10-28"
      ]
    ],
    "password": {
      "section_heading": "Passwort",
      "section_description": "Wählen Sie ein neues Passwort. Aus Sicherheitsgründen melden wir Sie auf Ihren anderen Geräten ab.",
      "current_label": "Aktuelles Passwort"
    },
    "verify": {
      "heading": "Noch ein Schritt",
      "intro": "Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein.",
      "code_label": "Code",
      "submit": "Prüfen",
      "use_recovery": "Telefon nicht dabei? Wiederherstellungscode verwenden",
      "sign_out": "Abmelden"
    },
    "picker": [
      "English",
      "Magyar",
      "Deutsch"
    ]
  }
} as const
