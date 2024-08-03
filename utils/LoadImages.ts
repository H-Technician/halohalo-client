// 判断一组图片是否加载完全
export function loadImages(urls: string[], onAllImagesLoaded: () => void, onError: (error: Error) => void) {
  const images = urls.map((url) => new Image());
  let loadedCount = 0;

  images.forEach((image, index) => {
    const url = urls[index];

    image.src = url;

    image.onload = () => {
      loadedCount++;
      if (loadedCount === urls.length) {
        onAllImagesLoaded();
      }
    };

    image.onerror = (error) => {
      onError(new Error(`图片加载失败 ${url}: ${error}`));
    };
  });

  // 如果没有任何图片在缓存中，并且所有图片都没有触发onload事件，
  // 我们可能需要设置一个超时来调用onError，以避免无限期地等待。
  // 这通常不是必需的，但根据你的具体用例可能有用。
  const timeoutId = setTimeout(() => {
    if (loadedCount !== urls.length) {
      onError(new Error('图片加载超时'));
    }
  }, /* 设置一个合理的超时时间，例如5000毫秒 */);

  // 当所有图片都加载完成后，清除可能的超时
  Promise.resolve().then(() => {
    clearTimeout(timeoutId);
  });
}

// 判断一张图片是否加载完全
export function loadImage(url: string, onLoad: () => void, onError: (error: Error) => void) {
  const image = new Image();
  image.src = url;

  image.onload = () => {
    // 图片加载完成，调用onLoad
    onLoad();
  };

  image.onerror = (error) => {
    // 图片加载出错，调用onError
    onError(new Error(`图片加载失败 ${url}: ${error}`));
  };
}