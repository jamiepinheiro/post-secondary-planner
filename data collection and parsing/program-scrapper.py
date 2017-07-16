#scrap the data from electronicinfo.ca

#libraries needed to get data from url
import urllib2
from bs4 import BeautifulSoup

#formatting library
import json

#program object definition
class Program:
	def __init__(self, programAttr):
		try:
			self.requirements = programAttr[0]
	    		self.title = programAttr[1].replace('\n', '')
			self.url = programAttr[2]
			self.university = programAttr[3].replace('\n', '')
			self.degree = programAttr[4].replace('\n', '')
			self.ouac = programAttr[5].replace('\n', '')
			self.gradeRange = programAttr[6].replace('\n', '')
			self.outsideLearning = programAttr[7].replace('\n', '')

		except Exception:
			raise

#list of all programs
programs = []

#load data from  main web page
page_unis = urllib2.urlopen("http://www.electronicinfo.ca/universities")
soup_unis = BeautifulSoup(page_unis, "html.parser")

#collect all the links to each university's page
all_links_unis = soup_unis.find_all("a")

#go through each url
for link_uni in all_links_unis:

	#get link from url
	url_uni = str(link_uni.get("href"))

	#if a url page
	if "http://www.electronicinfo.ca/programs/university/" in url_uni:

		#load data from url
		page_programs = urllib2.urlopen(url_uni)
		soup_programs = BeautifulSoup(page_programs, "html.parser")

		#find all links to urls
		all_links_programs = soup_programs.find_all("a")

		#go through each of the links
		for link_program in all_links_programs:

			#get link from url
			url_program = str(link_program.get("href"))

			#make sure last part of url is a number
			if url_program[len(url_program)-1].isdigit():

				#load data from url
				page_specific_program = urllib2.urlopen(url_program)
				soup_specific_program = BeautifulSoup(page_specific_program, "html.parser")

				#lists to store information
				programAttr = []
				requirements = []

				#get all items in a list; the requirements
				requirements_data = soup_specific_program.find_all("li")
				for data in requirements_data:
					if data.parent.parent.parent.get("id") == "requirements":
						try:
							if data.text != "AP Admission Information" and data.text != "IB Admission Information":
								requirements.append(data.text.encode('utf-8'))
						except UnicodeEncodeError:
							raise

				#add requirements to program attributes
				programAttr.append(requirements)

				#find the title
				title = ""
				try:
					title = soup_specific_program.find("h1", {"class": "template-heading"}).text.encode('utf-8')
				except UnicodeEncodeError:
					raise

				#add the title
				programAttr.append(title);

				#find the url
				url = ""
				try:
					url = "<a href='" + soup_specific_program.find("a", {"class": "program-apply"}).get("href").encode('utf-8') + "' target='_blank'>Learn More</a>"
				except UnicodeEncodeError:
					raise

				#add url
				programAttr.append(url);

				#find outside learning information
				overview_data = soup_specific_program.find_all("dd")
				for data in overview_data:
					try:
						programAttr.append(data.text.encode('utf-8'))
					except UnicodeEncodeError:
						raise

				#save profile to the list of programs
				programs.append(Program(programAttr))

#print out all the programs
print(json.dumps([ob.__dict__ for ob in programs]))
