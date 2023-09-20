export interface SearchEngine {
  navbarSelectors: string[]
  sidebarSelectors: string[]
  downloadSelectors: string[]
  watchRouteChange?: (callback: () => void) => void
}

export const config: Record<string, SearchEngine> = {
  linkedin: {
    navbarSelectors: ['div.application-outlet div.authentication-outlet div div.hiring-applicants__header-placeholder div div'],
    sidebarSelectors: ['body > div.application-outlet > div.authentication-outlet > div > div.hiring-applicants__container.neptune-grid > div > div > div.hiring-applicants__list-container > ul'],
    downloadSelectors: ["body > div.application-outlet > div.authentication-outlet > div > div.hiring-applicants__container.neptune-grid > div > main > div > div:nth-child(3) > div.hiring-resume-viewer__resume-wrapper--collapsed > div.display-flex.justify-space-between.align-items-flex-start.pl5.pr5.pt5.pb3 > a"]
  },
}
