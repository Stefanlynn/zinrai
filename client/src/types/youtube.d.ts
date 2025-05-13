// Type definitions for YouTube IFrame Player API
interface Window {
  onYouTubeIframeAPIReady: () => void;
  YT: {
    Player: new (
      container: HTMLElement | string,
      options: {
        videoId: string;
        playerVars?: {
          autoplay?: number;
          controls?: number;
          showinfo?: number;
          rel?: number;
          modestbranding?: number;
          iv_load_policy?: number;
          loop?: number;
          playlist?: string;
          enablejsapi?: number;
          mute?: number;
        };
        events?: {
          onReady?: (event: { target: any }) => void;
          onStateChange?: (event: { data: number }) => void;
          onPlaybackQualityChange?: (event: any) => void;
          onPlaybackRateChange?: (event: any) => void;
          onError?: (event: any) => void;
          onApiChange?: (event: any) => void;
        };
      }
    ) => {
      playVideo: () => void;
      pauseVideo: () => void;
      stopVideo: () => void;
      seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
      clearVideo: () => void;
      nextVideo: () => void;
      previousVideo: () => void;
      playVideoAt: (index: number) => void;
      mute: () => void;
      unMute: () => void;
      isMuted: () => boolean;
      setVolume: (volume: number) => void;
      getVolume: () => number;
      setSize: (width: number, height: number) => void;
      getIframe: () => HTMLIFrameElement;
      destroy: () => void;
    };
    PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  };
}