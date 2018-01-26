def isprime? num
  divisor = num - 1
  if num < 2
    return false
  else
    loop do
      return false if num % divisor == 0
      divisor -= 1
      return true if divisor == 1
    end
  end
end
