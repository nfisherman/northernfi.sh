#!/usr/bin/env bash
# -*- coding: utf-8 -*-

source .env
rsync -a ./data "${USERNAME}@${URL}:${DATADIR}"
