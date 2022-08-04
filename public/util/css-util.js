const toggleClass = (target, className) => () => 
  target.classList.toggle(className);

const toggleHide = (target) => toggleClass(target, 'el-hide');

const toggleClasses = (target, className) => () =>
  target.forEach(t => t.classList.toggle(className));

export {
  toggleClass,
  toggleClasses,
  toggleHide
}