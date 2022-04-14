import LanguageTag from './enums/LanguageTag.enum';

type Url = string;

type DateString = string;
type UTCDateString = string;

/** time in milliseconds */
type Timestamp = number;

type RGBColorString = string;
type HexColorString = string;

type UUID = string;

type AppLanguage = {
  tag: LanguageTag;
  isRTL: boolean;
};

type EmptyObj = Record<string, never>;

type ErrorAlert = {
  titleError: string;
  textError: string;
} | null;
