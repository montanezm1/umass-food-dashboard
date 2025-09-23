#!/usr/bin/env python3
"""
UMass Food Finder - Entry point for Railway deployment
This file helps Railway detect the project as Python and starts the backend server.
"""

import subprocess
import sys
import os

def main():
    """Start the FastAPI backend server"""
    os.chdir('backend')
    subprocess.run([
        sys.executable, '-m', 'uvicorn', 'main:app',
        '--host', '0.0.0.0',
        '--port', os.environ.get('PORT', '8000')
    ])

if __name__ == "__main__":
    main()