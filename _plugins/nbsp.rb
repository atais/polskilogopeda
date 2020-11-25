module Nbsp
    def nbsp( input )
      text = input.gsub(/ ([aAwWzZiIoOuU]) /, ' \1&nbsp;')
      text
    end
end

Liquid::Template.register_filter(Nbsp)
