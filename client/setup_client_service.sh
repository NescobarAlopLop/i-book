#!/usr/bin/env bash

sudo cp /home/ge/i-book/client/ip_clinet.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ip_clinet.service
sudo systemctl start ip_clinet.service
sudo systemctl restart ip_clinet.service

systemctl status ip_clinet.service
