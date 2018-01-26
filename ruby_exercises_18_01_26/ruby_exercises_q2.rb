class Book

  def initialize title, chapters
    @title, @chapters = title, chapters
  end

  def add_chapter new_chapter
    @chapters.push new_chapter
  end


  def chapters
    counter = 1
    puts "Your book, #{@title}, has #{@chapters.length} chapters:"
    for c in @chapters
      puts "#{counter}. #{c}"
    end
  end

end
