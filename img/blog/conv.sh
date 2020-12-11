#!/bin/bash

filename=$(basename -- "$1")
extension="${filename##*.}"
filename="${filename%.*}"

mkdir -p $filename

convert $1 -resize 1140x "$filename/1140.$extension"
convert $1 -resize 280x "$filename/280.$extension"
mv $1 "$filename/orig.$extension"
