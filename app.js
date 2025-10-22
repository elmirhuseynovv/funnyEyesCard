const eyes = document.querySelectorAll(".eye");

eyes.forEach((eye) => {
  const iris = eye.querySelector(".iris");
  const defaultAngleDeg = parseFloat(eye.dataset.defaultAngle);
  const radius = 20; // default offset məsafəsi

  // default vəziyyəti təyin et
  const angleRad = defaultAngleDeg * (Math.PI / 180);
  const defaultX = radius * Math.cos(angleRad);
  const defaultY = radius * Math.sin(angleRad);
  iris.dataset.defaultX = defaultX; // saxla
  iris.dataset.defaultY = defaultY; // saxla
  iris.style.transform = `translate(${defaultX}px, ${defaultY}px)`;
});

document.addEventListener("mousemove", (e) => {
  eyes.forEach((eye) => {
    const iris = eye.querySelector(".iris");
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;

    const deltaX = e.clientX - eyeX;
    const deltaY = e.clientY - eyeY;

    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 30);
    const angle = Math.atan2(deltaY, deltaX);

    const irisX =
      distance * Math.cos(angle) + parseFloat(iris.dataset.defaultX);
    const irisY =
      distance * Math.sin(angle) + parseFloat(iris.dataset.defaultY);

    iris.style.transform = `translate(${irisX}px, ${irisY}px)`;
  });
});
