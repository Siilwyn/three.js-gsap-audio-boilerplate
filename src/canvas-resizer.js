const setRendererSize = renderer =>
  renderer.setSize(window.innerWidth, window.innerHeight);

module.exports = (camera, renderer) => {
  setRendererSize(renderer);
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      setRendererSize(renderer);
    },
    false
  );
};
