const express = require('express');

class Settings{
  BACKURL = "http://localhost:8000";
  SUPPORTSERVER = `http://localhost:${process.env.PORT || "7777"}`
}

module.exports = Settings;
