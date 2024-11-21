import requests
from bs4 import BeautifulSoup
import time

def scrape_schedules():
    base_url = "https://navigator.cnu.edu/StudentScheduleofClasses/"

    session = requests.Session()

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Referer': 'https://navigator.cnu.edu/StudentScheduleofClasses/socquery.aspx',
        'Origin': 'https://navigator.cnu.edu',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'Priority': 'u=0, i',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive'
    }

    query_response = session.get(base_url + "socquery.aspx", headers=headers, timeout=15)

    html = BeautifulSoup(query_response.text, 'html.parser')

    viewstate = html.find('input', {'name': '__VIEWSTATE'})['value']
    viewstategenerator = html.find('input', {'name': '__VIEWSTATEGENERATOR'})['value']
    eventvalidation = html.find('input', {'name': '__EVENTVALIDATION'})['value']

    semester_select = html.find('select', {'id': 'semesterlist'})
    options = semester_select.find_all('option')

    # '202510' is the ID for the Spring 2025 semester, hardcoded for now
    semester_value = '202510'

    form_data = {
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__VIEWSTATE': viewstate,
            '__VIEWSTATEGENERATOR': viewstategenerator,
            '__EVENTVALIDATION': eventvalidation,
            'semester_list': semester_value,
            'Interestlist2': 'Any',
            'CourseNumTextbox': '',
            'Button1': 'Search'
    }

    post_response = session.post(base_url + "socquery.aspx", data=form_data, headers=headers, timeout=15)
    if post_response.status_code != 200:
        print(f"Form submission failed: code {post_response.status_code}")
        print(post_response.text)
        return

    time.sleep(1)

    result_response = session.get(base_url + "socresults.aspx", headers=headers, timeout=15)

    response_soup = BeautifulSoup(result_response.text, 'html.parser')
    table = response_soup.find('table', {'id': 'GridView1'})

    output_data = []

    rows = table.find_all('tr')[1:]

    for row in rows:
        cells = row.find_all('td')

        course_row = [
            cells[0].text.strip(),          # CRN
            cells[1].text.strip(),          # Course
            cells[2].text.strip(),          # Section
            cells[3].text.strip(),          # Title
            cells[4].text.strip(),          # Hours
            cells[6].text.strip(),          # Area
            cells[7].text.strip(),          # Type
            cells[8].text.strip(),          # Days
            cells[9].text.strip(),          # Time
            cells[10].text.strip(),         # Location
            cells[11].text.strip(),         # Instructor
            cells[12].text.strip(),         # Seats
            cells[13].text.strip(),         # Status
        ]

        output_data.append(course_row)

    return output_data