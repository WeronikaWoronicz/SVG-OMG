/// <reference types='codeceptjs' />
type homePage = typeof import('./homePage');
type CustomHelper = import('./CustomHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, homePage: homePage }
  interface Methods extends Playwright, CustomHelper, FileSystem {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
