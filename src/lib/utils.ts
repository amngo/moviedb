// Utility function to convert large numbers to a readable format
export const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return '$' + (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
    } else if (num >= 1e6) {
      return '$' + (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1e3) {
      return '$' + (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return '$' + num + ''
  }

  // Utility function to format dates
  export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short', // Change to 'short' to shorten month names to three letters
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Utility function to debounce a function
  export const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null
    return (...args: any[]) => {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        func(...args)
      }, wait)
    }
  }
