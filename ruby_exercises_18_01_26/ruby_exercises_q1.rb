module HelperMethods

  def titleize (string)
    omitted_words = ['in','the','of','and','or','from']
    string_arr = string.split #convert string into array of words
    for word in string_arr
      word.downcase! if word.downcase != word  #convert word to downcase
      word.capitalize! if !omitted_words.include? word #capitalize words that are not exempt from capitalization
    end
    p string_arr.join(' ') #convert array to string
  end
end



class ExtendExample
  extend HelperMethods
#
#   def call_titleize
#     titleize("this string was called using the command 'titleize'")
#   end
#
end


class IncludeExample
  include HelperMethods
  #
  # def call_titleize
  #   titleize("this string was called using the command 'titleize'")
  # end

end


############################################


puts "Include: 'include' will add methods from a given module as instance methods."

puts "Example 1: IncludeExample.new.titleize('capitalize the string') will execute properly as an instance method:"

IncludeExample.new.titleize('capitalize the string') #run example

print "\n"

puts "Example 2: IncludeExample.titleize('capitalize the string') will throw an error because titleize is not defined as a class method:"

begin #handle error caused by example
  raise IncludeExample.titleize('capitalize the string')
rescue Exception => e
  puts e.message #return error message
end

############################################
print "\n \n \n"
############################################


puts "Extend: 'extend'  add methods from a given module as class methods."

puts "Example 1: ExtendExample.titleize('capitalize the string') will execute properly as a class method:"

ExtendExample.titleize('capitalize the string')

print "\n"

puts "Example 2: ExtendExample.new.titleize('capitalize the string') will throw an error because titleize is not defined as an instance method:"

begin #handle error caused by exception
  raise ExtendExample.new.titleize('capitalize the string')
rescue Exception => e
  puts e.message #return error message
end
