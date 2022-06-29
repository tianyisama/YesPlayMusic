import Player from '@/web/components/New/PlayerMobile'
import { css, cx } from '@emotion/css'
import { useMemo } from 'react'
import { player } from '@/web/store'
import { useSnapshot } from 'valtio'
import Router from '@/web/components/New/Router'
import MenuBar from './MenuBar'
import Topbar from './Topbar/TopbarMobile'
import { isIOS, isIosPwa, isPWA, isSafari } from '@/web/utils/common'
import Login from './Login'
import { useLocation } from 'react-router-dom'
import PlayingNext from './PlayingNextMobile'

const LayoutMobile = () => {
  const playerSnapshot = useSnapshot(player)
  const showPlayer = !!playerSnapshot.track
  const location = useLocation()

  return (
    <div id='layout' className='bg-white select-none pb-28 dark:bg-black'>
      <main className='min-h-screen pb-16 overflow-x-hidden overflow-y-auto'>
        {location.pathname === '/' && <Topbar />}
        <Router />
      </main>
      <div
        className={cx(
          'fixed bottom-0 left-0 right-0 z-20 pt-3 dark:bg-black',
          css`
            padding-bottom: calc(
              ${isIosPwa ? '24px' : 'env(safe-area-inset-bottom)'} + 0.75rem
            );
          `
        )}
      >
        {showPlayer && (
          <div
            className={cx(
              'absolute left-7 right-7 z-20',
              css`
                top: calc(
                  -100% - 6px + ${isIosPwa ? '24px' : 'env(safe-area-inset-bottom)'}
                );
              `
            )}
          >
            <Player />
          </div>
        )}

        <MenuBar />
        {/* <PlayingNext /> */}
      </div>

      <Login />

      {/* Notch background */}
      {isIosPwa && (
        <div
          className={cx(
            'fixed left-0 right-0 bg-black/30 backdrop-blur-sm',
            css`
              top: -50px;
              height: 50px;
            `
          )}
        ></div>
      )}
    </div>
  )
}

export default LayoutMobile