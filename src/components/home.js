import {MAP_META} from '../constants';
import useStickySWR from '../hooks/usestickyswr';
// import {useWindowSize} from 'react-use';
import StateMeta from './statemeta';
import React, {useMemo,useState, useRef, lazy, Suspense} from 'react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import {useIsVisible} from 'react-is-visible';
import {
  ClockIcon
} from '@primer/octicons-v2-react';
import {
  capitalize,
  formatLastUpdated
} from '../utils/commonfunctions';
import useSWR from 'swr';

import DeltaBarGraph from './deltabargraph';
import StateDropdown from './statedropdown';


import {PRIMARY_STATISTICS, COLORS} from '../constants';
import {NUM_BARS_STATEPAGE, STATE_NAMES} from '../constants';
import {
  fetcher,
  formatDate,
  formatNumber,
  getStatistic,
} from '../utils/commonfunctions';


import * as Icon from 'react-feather';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {useSpring, animated, config} from 'react-spring';
import {useMeasure} from 'react-use';


const TimeSeriesExplorer = lazy(() =>
  import('./timeseriesexplorer' /* webpackChunkName: "TimeSeriesExplorer" */)
);

const MapExplorer = lazy(() =>
  import('./mapexplorer' /* webpackChunkName: "MapExplorer" */)
);

const Actions = lazy(() =>
  import('./actions' /* webpackChunkName: "Actions" */)
);

const Table = lazy(() => import('./table' /* webpackChunkName: "Table" */));

const Minigraph = lazy(() =>
  import('./minigraph' /* webpackChunkName: "Minigraph" */)
);

const Footer = lazy(() => import('./footer' /* webpackChunkName: "Footer" */));

const Search = lazy(() => import('./search' /* webpackChunkName: "Search" */));

const Level = lazy(() => import('./level' /* webpackChunkName: "Level" */));

const stateCode = "TG" ;
function Home(props) {
  const [regionHighlighted, setRegionHighlighted] = useState({
    stateCode: 'TT',
    districtName: null,
  });

  const [anchor, setAnchor] = useState(null);
  const [mapStatistic, setMapStatistic] = useState('active');

  const [date, setDate] = useState('');

  const {data1} = useStickySWR(
    `https://api.covid19india.org/v3/min/data.min.json`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 100000,
      revalidateOnFocus: false,
    }
  );

  const {data: timeseries} = useStickySWR(
    'https://api.covid19india.org/v3/min/timeseries.min.json',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const {data} = useStickySWR(
    `https://api.covid19india.org/v3/min/data${
      date ? `-${date}` : ''
    }.min.json`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 100000,
      revalidateOnFocus: false,
    }
  );

  const homeRightElement = useRef();
  const isVisible = useIsVisible(homeRightElement, {once: true});

  const stateCodes = [
    'TT',
    ...[
      ...new Set([
        ...Object.keys(MAP_META).filter((stateCode) => stateCode !== 'TT'),
        ...Object.keys(data || {}).filter((stateCode) => stateCode !== 'TT'),
      ]),
    ].sort(),
  ];



  return (
    <React.Fragment>
      <Helmet>
        <title>Coronavirus Outbreak in Hyderabad - https://covid19hyd.herokuapp.com/</title>
        <meta
          name="title"
          content="Coronavirus Outbreak in Hyderabad: Latest Map and Case Count"
        />
      </Helmet>

      <div className="Home">
        <div className="home-left">
          <div className="header">
            {/* <Suspense fallback={<div />}>
              <Search />
            </Suspense> */}

            {/* {windowSize.width > 769 && (
          <h1>COVID-19</h1>
        )} */}

<BrowserView>
    <h1>COVID-19</h1>
</BrowserView>

            
            <h1>Hyderabad</h1>
            {timeseries && (
              <Suspense fallback={<div style={{minHeight: '56px'}} />}>
              
                {/* <Actions
                
                  {...{
                    setDate,
                    dates: Object.keys(timeseries['TG']).reverse(),
                    date,
                  }}
                /> */}
                
                <p className="lastp">
                
                {capitalize(
                  ` Last updated ${formatLastUpdated(data['TG'].meta.last_updated)} ${'ago'}`
                )}
                </p>
                

              {/* {data?.meta?.['last_updated'] && (
              <p className="last-updated">
                <ClockIcon />
                {capitalize(
                  `${formatLastUpdated(data['TG'].meta.last_updated)} ${t('ago')}`
                )}
              </p>
            )} */}

              </Suspense>
            )}
          </div>

          {data && (
            <Suspense fallback={<div />}>
              <Level data={data['TG'].districts["Hyderabad"]} />
            </Suspense>
          )}

          {/* <Suspense fallback={<div />}>
            {timeseries && (
              <Minigraph timeseries={timeseries['TT']} {...{date}} />
            )}
          </Suspense>

          <Suspense fallback={<div />}>
            {data && (
              <Table {...{data, regionHighlighted, setRegionHighlighted}} />
            )}
          </Suspense> */}



{/* <Suspense fallback={<div />}>
            {data && (
              <Table {...{data, regionHighlighted, setRegionHighlighted}} />
            )}
          </Suspense> */}
<br />
<Suspense fallback={<div />}>
            {data && (
              <Table {...{data, regionHighlighted, setRegionHighlighted}} />
            )}
          </Suspense> 

<Suspense fallback={<div />}>
            {timeseries && (
              <Minigraph timeseries={timeseries['TG']} {...{date}} />
            )}
          </Suspense>

          <br />
          <br />

        {/* </div> */}
        {/* className="home-right" */}
        <div  ref={homeRightElement}>
          {isVisible && (
            <React.Fragment>
              {data && (
                <Suspense fallback={<div />}>
                  <MapExplorer
                    stateCode="TG"
                    {...{data}}
                    {...{mapStatistic, setMapStatistic}}
                    {...{regionHighlighted, setRegionHighlighted}}
                    {...{anchor, setAnchor}}
                  />
                  
                </Suspense>

                
                
              )}



{/* <Suspense fallback={<div />}>
            {timeseries && (
              <Minigraph timeseries={timeseries['TG']} {...{date}} />
            )}
          </Suspense> */}

              {timeseries && (
                <Suspense fallback={<div />}>
                  <TimeSeriesExplorer
                    timeseries={timeseries[regionHighlighted.stateCode]}
                    {...{date, stateCodes}}
                    {...{regionHighlighted, setRegionHighlighted}}
                    {...{anchor, setAnchor}}
                  />
                </Suspense>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      </div>
      {/* {isVisible && (
        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      )} */}
    </React.Fragment>
  );
}

export default Home;
