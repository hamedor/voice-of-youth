Проект выполнен на Next js. Для запросов используется Graph ql + Apollo.

Сделано:
* Оффсет пагинация для новостей
* Фильтр новостей по категориям, поиск по тексту/заголовкам
* Расчет времени чтени новости.
* Возможность регистрации\аутентицикации.
* Возможность ставить лайки к новости.
* Возможность писать комментарии к новости, а также отвечать на другие комментарии.
* Комментарии реализованы с помощью рекурсии, каждый  комментарий может содержать в себе ответ в виде другого комментария. Реализовано до 5го уровня вложенности, в связи с тем, что в Graph ql нет возможности сделать рекурсивный запрос, приходится прописывать вручную количество уровней вложенности.

В планах:
* Возможность пользователю редактировать свой профиль.
* ~~Уменьшить вес запроса списка новостей за счет отказа от запроса основного контента новости. Сейчас реализация именно такая с целью расчета времени чтения. Соответственно время чтения будет указано в конкретной новости.~~
* Сделать счетчик просмотров новости.
* ~~Переделать структуру комментариев в вид комментарий -> массив ответов на комментарий.~~
* Лайки и пагинация для комментариев.

Обновление 0.2.0
* Значительно увеличена скорость загрузки списка новостей за счёт отказа от запроса основного контента новости. Основной контент теперь загружается в самой новости. Время чтения расчитывается тамже.

Обновление 0.2.2
* Переделана структура комментариев в вид комментарий -> массив ответов. Каждый ответ на комментарий содержит в себе имя автора и текст комментария, на которые он был отвечен.

Обновление 0.2.3
* Комментарии теперь можно отправлять по API, а не только из CMS. 

Обновление 0.2.5
* Обновление 0.2.0 потребаволо переработки поиска. Теперь поиск работает.


///////////////////////////////////////////////////////

Done:
* Offset pagination for articles.
* Filters for articles by category, search by text/title.
* Calculate reading time for article.
* User registration/autentification.
* Possibility put/delete like to article.
* Possibility to write commentary to article and answer on another commentaries.
* Commentaries implemented with recursion. Every commentary could have another commentary inside. This feature work up to 5 nest levels, case Graph ql doesnt allow recursive querries.

Todo:
* User ability to edit his profile.
* ~~Make articles list query smaller by not to query article main content. Now article main content contains in article list query to implenment reading time. Accordingly, reading time will be inside specific article.~~
* Views counter for article.
* ~~Rewrite structure of commentaries to 'commentary => array of answers on commentary'.~~
* Likes and pagination for commentaries.

Update 0.2.0
* Greatly increased speed of loading news list by refuse of query main content there. Main content now downloading inside specific article. Reading time calculating same there.

Update 0.2.2
* Rewrited structore of commentaries to 'commentary => array of answers on commentary', Each answer on commentary contains text and name of author of commentary, which it was answered.

Update 0.2.3
* Now able send comments via API, instead only from CMS.

Update 0.2.5
* Update 0.2.0 required to search rework. Now it works.