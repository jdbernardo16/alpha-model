<template>
    <section>
        <div id="contact" class="-translate-y-[80px]"></div>
        <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-20 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h1 class="text-2xl font-bold sm:text-3xl">
                    LOOKING FOR TALENT FOR YOUR NEXT PROJECT?
                </h1>

                <p class="mt-4 text-gray-500">
                    Fill out the form below with your project details or email
                    <a
                        href="mailto:admin@alphatalentmanagement.com"
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary-gold hover:text-yellow-500"
                        >admin@alphatalentmanagement.com</a
                    >
                    and we’ll connect you with the right talent! <br /><br />First Name, Last Name,
                    Phone, Details about the project, description of talent needed, location of
                    shoot and shoot date
                </p>
            </div>

            <form action="#" class="mx-auto mt-8 mb-0 max-w-2xl">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    <div>
                        <label for="first_name" class="block text-xs font-medium text-gray-700"
                            >First Name</label
                        >
                        <input
                            type="text"
                            id="first_name"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label for="last_name" class="block text-xs font-medium text-gray-700"
                            >Last Name</label
                        >
                        <input
                            type="text"
                            id="last_name"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="email" class="block text-xs font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="email"
                            id="email"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="phone" class="block text-xs font-medium text-gray-700"
                            >Phone</label
                        >
                        <input
                            type="tel"
                            id="phone"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="news" class="relative flex items-start">
                            <input
                                type="checkbox"
                                id="news"
                                class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
                            />

                            <div class="ml-3 text-sm">
                                <span class="block font-medium text-gray-700">
                                    Sign up for news and updates
                                </span>
                            </div>
                        </label>
                    </div>

                    <div class="col-span-full">
                        <label for="project_details" class="block text-xs font-medium text-gray-700"
                            >Briefly Describe Your Project:</label
                        >
                        <textarea
                            id="project_details"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        ></textarea>
                    </div>

                    <div class="col-span-full">
                        <label
                            for="talent_description"
                            class="block text-xs font-medium text-gray-700"
                            >Description of Talent Needed:</label
                        >
                        <textarea
                            id="talent_description"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        ></textarea>
                    </div>

                    <div>
                        <label for="location" class="block text-xs font-medium text-gray-700"
                            >Location of Shoot:</label
                        >
                        <input
                            type="text"
                            id="location"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                    </div>

                    <div>
                        <label for="shoot_date" class="block text-xs font-medium text-gray-700"
                            >Shoot Date:</label
                        >
                        <input
                            type="date"
                            id="shoot_date"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                    </div>
                </div>

                <div class="m-auto mt-4 w-fit">
                    <button
                        type="submit"
                        class="inline-flex w-full justify-center rounded bg-primary-gold px-5 py-3 text-sm font-medium text-white sm:w-auto"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
