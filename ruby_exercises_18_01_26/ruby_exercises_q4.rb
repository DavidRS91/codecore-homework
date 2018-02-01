major_cities = {BC: ["Vancouver", "Victoria", "Prince George"], AB: ["Edmonton", "Calgary"], SK: ['Regina']}

str =  ""
for prov , cities in major_cities
  if cities.length > 1
   str.concat "#{prov} has #{cities.length} main cities: "
   last_city = cities.pop
   str.concat cities.join(', ')
   str.concat " and #{last_city}"
   puts str
   str = ''
 else
   puts "#{prov} has 1 main city: #{cities[0]}"
 end
end
