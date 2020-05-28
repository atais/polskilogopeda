#!/bin/bash

rm -rf "/run/user/1000/gvfs/smb-share:server=qsiata.local,share=web/web1"

cp -r "./_site" "/run/user/1000/gvfs/smb-share:server=qsiata.local,share=web/web1"