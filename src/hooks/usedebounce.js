// The global clearTimeout() method cancels a timeout previously established by calling setTimeout().

function useDebounce(cb, delay = 2000) {
    
  let timerId;

  return (...args) => {
    console.log(args);
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      cb(...args)
    }, delay);
  };
}

export default useDebounce;
