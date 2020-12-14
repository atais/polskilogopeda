#!/bin/bash

filename=$(basename -- "$1")
extension="${filename##*.}"
filename="${filename%.*}"

mkdir -p $filename

convert $1 -resize 1140x "$filename/1140.png"
convert $1 -resize 480x "$filename/480.png"
mv $1 "$filename/orig.$extension"
