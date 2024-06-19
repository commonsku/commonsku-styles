import { assign, isEmpty, map, range, tail } from 'lodash';
import React, { useRef, useState, useEffect } from 'react';

import { wait } from '../utils';
import { SkubotSpinner } from './icons';
import colors from './colors';

const NOT_FOUND_IMG_SRC = '/images/404.png';
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_ATTEMPT_INTERVAL = 1000;


// fetch image src, and return intervals.length times on error. wait intervals[n] ms on nth retry
const fetchImage = (src: string, intervals: number[], onRetry: OnErrorEventHandler): { promise: Promise<Event>, cancel: () => void } => {
  const image = new Image();
  let cancel = () => {
    image.src = '';
  };
  const promise = new Promise<Event>((resolve, reject) => {
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
  }).catch((error) => {
    if (isEmpty(intervals)) {
      throw error;
    } else if (image.src === '') {
      return error;
    } else {
      onRetry && onRetry(error);
      const w = wait(intervals[0]);
      cancel = w.cancel;
      return w.promise.then(() => {
        const result = fetchImage(src, tail(intervals), onRetry);
        cancel = result.cancel;
        return result.promise;
      });
    }
  });
  return {
    promise, 
    cancel: () => {
      // use this to cancel next fetch
      cancel();
    }
  }
}

type ImgProps = {
  src?: string,
  alt?: string,
  max_attempts?: number,
  attempt_interval?: number,
  onRetry?: OnErrorEventHandler
  onFailed?: OnErrorEventHandler
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Img = React.forwardRef<HTMLImageElement, ImgProps>(({ 
  src, alt="", 
  max_attempts=DEFAULT_MAX_ATTEMPTS, 
  attempt_interval=DEFAULT_ATTEMPT_INTERVAL, 
  onRetry=null,
  onFailed=null,
  ...props
}, ref) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRef = useRef<any>({});
  assign(effectRef.current, { onRetry, onFailed });

  useEffect(() => {
    const { onRetry, onFailed, cancel } = effectRef.current;
    // cancel previous fetch before start new fetch
    cancel && cancel();
    const result = fetchImage(src ?? "", map(range(max_attempts), (i) => {
      return attempt_interval * (i + 1) * (i + 1);
    }), onRetry);
    effectRef.current.cancel = result.cancel;
    result.promise
      .then(() => {
        setError(null);
      })
      .catch((e) => {
        onFailed && onFailed(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      })
    ;
  }, [src, attempt_interval, max_attempts]);

  if (loading) {
    return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: `${colors.teal['60']}99`, ...props.style }} {...props} >
      <SkubotSpinner size="small" skubot={false} color={colors.white} />
    </div>
  }

  return <img
    ref={ref}
    alt={alt}
    src={error ? NOT_FOUND_IMG_SRC : src}
    {...props}
  />;
});

export {Img};
