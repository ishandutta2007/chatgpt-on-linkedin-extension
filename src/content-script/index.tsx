import { render } from 'preact'
import SecondaryRoundedButton from '~/content-script/components/SecondaryRoundedButton'
import Switcher10 from '~/content-script/components/Switcher10'
import '../base.css'
import './styles.scss'
import { config } from './website-configs'

const siteRegex = new RegExp(Object.keys(config).join('|'))
let siteName
try {
  siteName = location.hostname.match(siteRegex)![0]
} catch (error) {
  siteName = location.pathname.match(siteRegex)![0]
}
const siteConfig = config[siteName]

console.log('siteConfig', siteConfig)

if (siteConfig.watchRouteChange) {
  siteConfig.watchRouteChange(run)
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect()
        resolve(document.querySelector(selector))
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

async function mountUploadLocalesButton(appendContainer: object, containerid?: string) {
  const handleBulkDownl = () => {
    waitForElm(siteConfig.sidebarSelectors[0]).then((elm) => {
      console.log('outer sidebarSelectors:')
      console.log(elm)
      elm.click()
      const countCandidates = elm.children.length
      console.log('countCandidates =', countCandidates)
      const candidateElems = elm.children
      var candidatesIterator = [...candidateElems]
      var promise = Promise.resolve();
      candidatesIterator.forEach(function(candElem) {
        promise = promise.then(function() {
          return new Promise((resolve, reject) => {
            setTimeout(function() {
              console.log(candElem);
              candElem.scrollIntoView()
              candElem.children[0].click();
              waitForElm(siteConfig.downloadSelectors[0]).then((downloadBtn) => {
                downloadBtn.scrollIntoView()
                downloadBtn.click();
              })
              resolve();
            }, 10000);
          })
        });
      });
    });
  }
  const container = document.createElement('div')
  container.className = 'bulk-resume-download-container'
  appendContainer.appendChild(container)
  render(
    <SecondaryRoundedButton onClick={() => handleBulkDownl()} displayText="Bulk Resume Download" />,
    container,
  )
}

waitForElm(siteConfig.navbarSelectors[0]).then((elm) => {
  console.log('navbarSelectors', elm)
  mountUploadLocalesButton(elm)
})
