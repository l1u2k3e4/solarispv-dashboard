export type LeadKanal = "formular" | "chatbot" | "whatsapp" | "roi-rechner";
export type LeadStatus = "neu" | "in-bearbeitung" | "abgeschlossen";

export type KiVorschlagTyp = "kurz-mail" | "whatsapp" | "rueckruf-best";

export type KiVorschlag = {
  typ: KiVorschlagTyp;
  text: string;
  confidence: number;
};

export type ChatTurn = {
  user: string;
  bot: string;
};

export type PvBerechnung = {
  kwp: number;
  investition: number;
  ersparnisJahr: number;
  amortisationJahre: number;
};

export type Lead = {
  id: string;
  kanal: LeadKanal;
  eingangszeit: string;
  status: LeadStatus;
  name: string;
  telefon: string;
  email?: string;
  anliegen: string;
  adresse?: string;
  stadtteil?: string;
  pvBerechnung?: PvBerechnung;
  chatVerlauf?: ChatTurn[];
  kiVorschlaege?: KiVorschlag[];
  notizen?: string;
  bearbeiteUm?: string;
};
