import requests
import pandas as pd
import io

url = "https://www.census.gov/retail/mrts/www/mrtssales92-present.xls"
headers = {'User-Agent': 'Mozilla/5.0'}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    df = pd.read_excel(io.BytesIO(response.content), engine="openpyxl", sheet_name=0)
    print(df.head(15))
    print(df.columns)
else:
    print(f"Failed: {response.status_code}")
